// var admin = require("firebase-admin");
import { initializeApp, cert }  from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth'

import serviceAccount from "./doc-q-5cfe1-firebase-adminsdk-cfewg-6d46cefd11.json" assert { type: 'json' };
const admin = initializeApp({
    credential: cert(serviceAccount)
});

const auth = getAuth(admin);

export {auth}