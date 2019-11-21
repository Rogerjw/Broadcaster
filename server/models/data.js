import User from './user.model';
import Redflag from './redflag.model';
export const users = [
  new User(
    1234567890123456,
    'Muhire',
    'Roger',
    'rogermuhire@gmail.com',
    'muhireroger',
    '0781870110',
    'rogerjw',
    'admin'
  ),
];

export const redflags = [
  new Redflag(
    1,
    '12/12/09',
    '1234567890123456',
    'Corruption',
    'Redflag',
    'Latitude:-1.9570688 Longitude:30.101504',
    'draft',
    'image.png',
    'video.mp4',
    'last night,i was asked to bribe a police off...'
  ),
];