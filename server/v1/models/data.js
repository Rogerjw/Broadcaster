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
  new User(
    1199880158239529,
    'Uwitonze',
    'Naice',
    'unaice@gmail.com',
    'uwinaice',
    '0788347151',
    'thineorb',
    'citizen'
  )

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
  new Redflag(
    2,
    '12/12/19',
    '1199880158029539',
    'Corruption',
    'Redflag',
    'Latitude:-1.9570688 Longitude:30.101504',
    'draft',
    'image.png',
    'video.mp4',
    'i was denied a driving license,just because i didnt have enough cash...'
  )
];