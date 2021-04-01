/* global describe, expect, it */

import getImageThumbnail from './get-image-thumbnail';

describe('getImageThumbnail', () => {
  if (getImageThumbnail({ media_details: {} })) {
    it('Should properly get an image thumbnail from a media object.', () => {
      expect(getImageThumbnail({
        media_type: 'image',
        media_details: {
          sizes: {
            thumbnail: {
              source_url: '/source/url/1',
            },
          },
        },
        source_url: '/source/url/2',
      })).toEqual('/source/url/1');
    });

    it('Should fall back to full size image if no thumbnail is present.', () => {
      expect(getImageThumbnail({
        media_type: 'image',
        source_url: '/source/url/2',
      })).toEqual('/source/url/2');
    });
  }

  it('Should properly get an image thumbnail from a media object.', () => {
    expect(getImageThumbnail({
      type: 'image',
      sizes: {
        full: {
          url: '/url/1',
        },
        thumbnail: {
          url: '/url/2',
        },
      },
    })).toEqual('/url/2');
  });

  it('Should properly get an image thumbnail from a media object.', () => {
    expect(getImageThumbnail({
      media_type: 'file',
      url: '/url/2',
    })).toEqual('/url/2');
  });

  it('Should properly get an image thumbnail from a media object.', () => {
    expect(getImageThumbnail({
      type: 'file',
      url: '/url/2',
    })).toEqual('/url/2');
  });

  it('Should return an empty string if there is no image URL present.', () => {
    expect(getImageThumbnail({})).toEqual('');
  });
});
