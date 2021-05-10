// @ts-check

const assert = require('assert');
const { ACM, Route53 } = require('aws-sdk');

/**
 * @typedef {object} Domain
 * @property {string} CertificateArn
 * @property {string} DomainName
 * @property {{ HostedZoneId: string }} Route53
 *
 * @typedef {object} HTTP
 * @property {{ Domain: Domain }} Properties
 *
 * @typedef {object} CFN
 * @property {{ HTTP: HTTP }} Resources
 *
 * @typedef {'staging' | 'production'} Stage
 */

/** @type {string} */
const DOMAIN = 'e5l.de';

/** @type {string} */
const NAME = 'lts-stack';

/**
 * @param {string=} x
 * @returns {boolean}
 */
const truthy = (x) => typeof x === 'string' && x.length > 0;

/**
 * @param {NodeJS.ProcessEnv} env
 * @param {string} message
 * @returns {void | never}
 */
const assertCredentials = (
  { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_PROFILE },
  message
) => {
  assert(
    (truthy(AWS_ACCESS_KEY_ID) && truthy(AWS_SECRET_ACCESS_KEY)) ||
      truthy(AWS_PROFILE),
    message
  );
};

/**
 * @param {Stage} stage
 * @returns {string}
 */
const getHostname = (stage) => {
  if (stage === 'staging') {
    return `${NAME}-${stage}.${DOMAIN}`;
  }
  return [NAME, DOMAIN].join('.');
};

/**
 * @returns {Promise<string | null>}
 */
const getHostedZoneId = async () => {
  const r53 = new Route53();

  try {
    const { HostedZones: zones } = await r53.listHostedZones().promise();
    const { Id: id } = zones.find(({ Name: n }) => n === `${DOMAIN}.`) || {};
    return typeof id === 'string' ? id.replace('/hostedzone/', '') : null;
  } catch (err) {
    console.log(
      'An error occurred while trying to retrieve the Hosted Zone ID...'
    );
    console.log(err);
    return null;
  }
};

/**
 * @returns {Promise<string | null>}
 */
const getCertificateArn = async () => {
  const acm = new ACM();

  try {
    const { CertificateSummaryList: list } = await acm
      .listCertificates()
      .promise();
    const { CertificateArn: arn } =
      list.find(({ DomainName: n }) => n === `*.${DOMAIN}`) || {};
    return arn || null;
  } catch (err) {
    console.log(
      'An error occurred while trying to retrieve the Certificate ARN...'
    );
    console.log(err);
    return null;
  }
};

/**
 * @param {?} _
 * @param {CFN} cfn
 * @param {Stage} stage
 * @returns {Promise<CFN> | never}
 */
module.exports = async (_, cfn, stage) => {
  assert(truthy(process.env.AWS_REGION), 'Env var AWS_REGION is present');
  assertCredentials(
    process.env,
    'AWS credentials are given explicitly or via profile'
  );

  const hostname = getHostname(stage);
  const [hostedZoneId, certificateArn] = await Promise.all([
    getHostedZoneId(),
    getCertificateArn(),
  ]);

  if (!hostedZoneId || !certificateArn) {
    throw new Error('Missing Hosted Zone ID or Certificate Arn.');
  }

  cfn.Resources.HTTP.Properties.Domain = {
    CertificateArn: certificateArn,
    DomainName: hostname,
    Route53: {
      HostedZoneId: hostedZoneId,
    },
  };

  return cfn;
};
