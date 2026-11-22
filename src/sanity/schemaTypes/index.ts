import { type SchemaTypeDefinition } from 'sanity';
import { sermonType } from './sermon';
import { eventType } from './event';
import { prayerRequestType } from './prayerRequest';
import { leaderType } from './leader';
import { contactSubmissionType } from './contactSubmission';
import { galleryAlbumType } from './galleryAlbum';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    sermonType,
    eventType,
    prayerRequestType,
    leaderType,
    contactSubmissionType,
    galleryAlbumType
  ]
};