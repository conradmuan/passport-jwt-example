import dotenv from 'dotenv';
import passport from 'passport';
import passportJwt from 'passport-jwt';

import { getUserById } from './usermodel';

dotenv.config();

const ExtractJwt = passportJwt.ExtractJwt;
const JWTStrategy = passportJwt.Strategy;

export default function configPassport() {

    // Config JWT Strategy
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PASSPORT_SECRET,
    }, async function(jwtPayload, callback) {
        try {
            const user = await getUserById(jwtPayload.id);
            if (!user || user instanceof Error) {
                return callback(null, false, { message: 'Could not find user.' });
            }

            return callback(null, user);

        } catch (err) {
            console.log(`==> something went wrong at the jwtstrategy`);
            console.error(err);
            return callback(err);
        }

    }))
}
