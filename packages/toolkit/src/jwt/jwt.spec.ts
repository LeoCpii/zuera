import { decode } from './jwt';

describe('decode', () => {
    it('should decode a valid token', () => {
        // eslint-disable-next-line max-len
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWljaGFlbCBTY290dCJ9.x2UaBsKbsOogBFr_BpUXyp_PF9OdfGOhN193mQs6PSw';
        const decoded = decode<{ name: string; }>(token);

        expect(decoded).toEqual({ name: 'Michael Scott' });
    });

    it('should throw an error when token is invalid', () => {
        const invalidToken = 'invalidToken';

        expect(() => decode(invalidToken)).toThrowError('Invalid token');
    });
});

