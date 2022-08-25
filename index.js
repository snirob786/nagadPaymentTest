import * as crypto from 'crypto';
import axios from 'axios';

// Configuration
const config = {
	apiVersion: 'v-0.2.0',
	baseURL: 'http://sandbox.mynagad.com:10080/remote-payment-gateway-1.0',
	callbackURL: 'https://webhook.site/66fd2b59-ae24-41d2-bdd1-9a00e63318f0',
	merchantID: '683002007104225',
	merchantNumber: '01701892123',
	privKey: 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCJakyLqojWTDAVUdNJLvuXhROV+LXymqnukBrmiWwTYnJYm9r5cKHj1hYQRhU5eiy6NmFVJqJtwpxyyDSCWSoSmIQMoO2KjYyB5cDajRF45v1GmSeyiIn0hl55qM8ohJGjXQVPfXiqEB5c5REJ8Toy83gzGE3ApmLipoegnwMkewsTNDbe5xZdxN1qfKiRiCL720FtQfIwPDp9ZqbG2OQbdyZUB8I08irKJ0x/psM4SjXasglHBK5G1DX7BmwcB/PRbC0cHYy3pXDmLI8pZl1NehLzbav0Y4fP4MdnpQnfzZJdpaGVE0oI15lq+KZ0tbllNcS+/4MSwW+afvOw9bazAgMBAAECggEAIkenUsw3GKam9BqWh9I1p0Xmbeo+kYftznqai1pK4McVWW9//+wOJsU4edTR5KXK1KVOQKzDpnf/CU9SchYGPd9YScI3n/HR1HHZW2wHqM6O7na0hYA0UhDXLqhjDWuM3WEOOxdE67/bozbtujo4V4+PM8fjVaTsVDhQ60vfv9CnJJ7dLnhqcoovidOwZTHwG+pQtAwbX0ICgKSrc0elv8ZtfwlEvgIrtSiLAO1/CAf+uReUXyBCZhS4Xl7LroKZGiZ80/JE5mc67V/yImVKHBe0aZwgDHgtHh63/50/cAyuUfKyreAH0VLEwy54UCGramPQqYlIReMEbi6U4GC5AQKBgQDfDnHCH1rBvBWfkxPivl/yNKmENBkVikGWBwHNA3wVQ+xZ1Oqmjw3zuHY0xOH0GtK8l3Jy5dRL4DYlwB1qgd/Cxh0mmOv7/C3SviRk7W6FKqdpJLyaE/bqI9AmRCZBpX2PMje6Mm8QHp6+1QpPnN/SenOvoQg/WWYM1DNXUJsfMwKBgQCdtddE7A5IBvgZX2o9vTLZY/3KVuHgJm9dQNbfvtXw+IQfwssPqjrvoU6hPBWHbCZl6FCl2tRh/QfYR/N7H2PvRFfbbeWHw9+xwFP1pdgMug4cTAt4rkRJRLjEnZCNvSMVHrri+fAgpv296nOhwmY/qw5Smi9rMkRY6BoNCiEKgQKBgAaRnFQFLF0MNu7OHAXPaW/ukRdtmVeDDM9oQWtSMPNHXsx+crKY/+YvhnujWKwhphcbtqkfj5L0dWPDNpqOXJKV1wHt+vUexhKwus2mGF0flnKIPG2lLN5UU6rs0tuYDgyLhAyds5ub6zzfdUBG9Gh0ZrfDXETRUyoJjcGChC71AoGAfmSciL0SWQFU1qjUcXRvCzCK1h25WrYS7E6pppm/xia1ZOrtaLmKEEBbzvZjXqv7PhLoh3OQYJO0NM69QMCQi9JfAxnZKWx+m2tDHozyUIjQBDehve8UBRBRcCnDDwU015lQN9YNb23Fz+3VDB/LaF1D1kmBlUys3//r2OV0Q4ECgYBnpo6ZFmrHvV9IMIGjP7XIlVa1uiMCt41FVyINB9SJnamGGauW/pyENvEVh+ueuthSg37e/l0Xu0nm/XGqyKCqkAfBbL2Uj/j5FyDFrpF27PkANDo99CdqL5A4NQzZ69QRlCQ4wnNCq6GsYy2WEJyU2D+K8EBSQcwLsrI7QL7fvQ==',
	pubKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjBH1pFNSSRKPuMcNxmU5jZ1x8K9LPFM4XSu11m7uCfLUSE4SEjL30w3ockFvwAcuJffCUwtSpbjr34cSTD7EFG1Jqk9Gg0fQCKvPaU54jjMJoP2toR9fGmQV7y9fz31UVxSk97AqWZZLJBT2lmv76AgpVV0k0xtb/0VIv8pd/j6TIz9SFfsTQOugHkhyRzzhvZisiKzOAAWNX8RMpG+iqQi4p9W9VrmmiCfFDmLFnMrwhncnMsvlXB8QSJCq2irrx3HG0SJJCbS5+atz+E1iqO8QaPJ05snxv82Mf4NlZ4gZK0Pq/VvJ20lSkR+0nk+s/v3BgIyle78wjZP1vWLU4wIDAQAB',
	isPath: false,
};


// Var Defination

const privateKey = formatKey(config.privKey, 'PRIVATE');
const publicKey = formatKey(config.pubKey, 'PUBLIC');
const orderId = "ord"+Math.floor(1000000 + Math.random() * 900000);
console.log("\n\n OrderId", orderId);
const clientType = 'PC_WEB';
const ip = 'null';
const newIP = ip === '::1' || ip === '127.0.0.1' ? '103.100.200.100' : ip;
const headers = {
    'X-KM-Api-Version': config.apiVersion,
    'X-KM-IP-V4': newIP,
    'X-KM-Client-Type': clientType,
}

let getSensativeData;
let getSignatureData;
let getPaymentReferenceId;
let getChallenge;
let callbackData;
let callBackUrl;
let confirmArgs ;
let firstData;
let decrypted;
let verifyResult;


// Helpers Functions

function getTimeStamp() {
    const now = new Date();
    const day = `${now.getDate()}`.length === 1 ? `0${now.getDate()}` : `${now.getDate()}`;
    const hour = `${now.getHours()}`.length === 1 ? `0${now.getHours()}` : `${now.getHours()}`;
    const minute = `${now.getMinutes()}`.length === 1 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
    const second = `${now.getSeconds()}`.length === 1 ? `0${now.getSeconds()}` : `${now.getSeconds()}`;
    const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : `${now.getMonth()}`;
    const year = now.getFullYear();
    return `${year}${month}${day}${hour}${minute}${second}`;
}


function encrypt(data) {
    const signerObject = crypto.publicEncrypt(
        { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
        Buffer.from(JSON.stringify(data))
    );

    const firstSense = signerObject.toString('base64');
    return firstSense;
}

function decrypt(data) {
    console.log("\n\nPlain Sensative Data: \n",data);
    const decryptedData = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(data, 'base64')).toString();
    console.log("\n\nDecrypted Data: \n", decryptedData);
    return JSON.parse(decryptedData);
}

function sign(data) {
    const signerObject = crypto.createSign('SHA256');
    signerObject.update(JSON.stringify(data));
    signerObject.end();
    const firstSign = signerObject.sign(privateKey, 'base64');
    return firstSign;
}

function createHash(string) {
    return crypto.createHash('sha1').update(string).digest('hex').toUpperCase();
}

function formatKey(key, type) {
    return /begin/i.test(key) ? key.trim() : `-----BEGIN ${type} KEY-----\n${key.trim()}\n-----END ${type} KEY-----`;
}

async function createPayment(){
    const endpoint = `${config.baseURL}/api/dfs/check-out/initialize/${config.merchantID}/${orderId}`;
    const timestamp = getTimeStamp();

    const sensitive = {
        merchantId: config.merchantID,
        datetime: timestamp,
        orderId: orderId,
        challenge: createHash(orderId),
    };

    const payload = {
        accountNumber: config.merchantNumber,
        dateTime: timestamp,
        sensitiveData: encrypt(sensitive),
        signature: sign(sensitive),
    };

    firstData = await axios.post(endpoint, payload, {
        headers:headers
    });
    console.log("\n\n\nFirst Data: \n",firstData.data)
    getSensativeData = firstData.data.sensitiveData;
    getSignatureData = firstData.data.signature;
    console.log("\n\n\nDecrypted layer executing with sensative data: \n", getSensativeData)
    decrypted = decrypt(getSensativeData);
    console.log("\n\n\nDecrypted Data: \n", decrypted)
    getPaymentReferenceId = decrypted.paymentReferenceId;
    getChallenge = decrypted.challenge;
    console.log("\n\nGet Payment Reference Id: ",getPaymentReferenceId)
}


async function confirmPayment(data){
    const { amount, challenge, ip, orderId, paymentReferenceId, productDetails } = data;
    const sensitiveData = {
        merchantId: config.merchantID,
        orderId,
        amount,
        currencyCode: '050',
        challenge,
    };
    const payload = {
        paymentRefId: paymentReferenceId,
        sensitiveData: encrypt(sensitiveData),
        signature: sign(sensitiveData),
        merchantCallbackURL: config.callbackURL,
        additionalMerchantInfo: {
            ...productDetails,
        },
    };

    callbackData = await axios.post(`${config.baseURL}/api/dfs/check-out/complete/${paymentReferenceId}`, payload, {
        headers:headers
    });

    console.log("\n\n\ncalled from second func: \n",getSensativeData)

    return callbackData;
}




async function verifyPayment(paymentRefID) {
    verifyResult = await axios.get(
        `${config.baseURL}/api/dfs/verify/payment/${paymentRefID}`,
        {
            headers:headers
        }
    );

    console.log("\n\n Verify Result: \n",verifyResult.data)
    // return verifyResult;
}



async function main(){
    const firstCreate = await createPayment();
    confirmArgs = {
        paymentReferenceId: getPaymentReferenceId,
        challenge: getChallenge,
        orderId: orderId,
        amount: '50',
        productDetails:{ a: '1', b: '2' },
        ip: newIP,
    };

    console.log("\n\nConfirm args: \n",confirmArgs)
    callBackUrl = await confirmPayment(confirmArgs);
    verifyPayment(getPaymentReferenceId)
    return callBackUrl;
}

main().then(res =>{
    console.log ("\n\n\nResponse: \n",res.data.callBackUrl)
}).catch(err => console.log("\n\n\nProblem Found: \n",err));