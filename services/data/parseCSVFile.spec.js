/* global describe, expect, it */

import parseCSVFile from './parseCSVFile';

const sampleData = `
region,demographic-type,demographic,1996,1997,1996-n,1997-n
Alabama,,,0.29,0.30,352273,609255
United States,,,0.33,0.37,556714,662527
United States,Gender,Women,0.41,0.30,267038,646380
`.trim();

const sampleFile = new File(
  [
    sampleData,
  ],
  'sample-data.csv',
  {
    type: 'text/csv',
  }
);

describe('parseCSVFile', () => {
  it('Should properly parse a valid CSV.', () => {
    expect.assertions(1);
    return parseCSVFile(sampleFile)
      .then((results) => expect(results).toEqual([
        {
          1996: 0.29,
          '1996-n': 352273,
          1997: 0.30,
          '1997-n': 609255,
          demographic: null,
          'demographic-type': null,
          region: 'Alabama',
        },
        {
          1996: 0.33,
          '1996-n': 556714,
          1997: 0.37,
          '1997-n': 662527,
          demographic: null,
          'demographic-type': null,
          region: 'United States',
        },
        {
          1996: 0.41,
          '1996-n': 267038,
          1997: 0.30,
          '1997-n': 646380,
          demographic: 'Women',
          'demographic-type': 'Gender',
          region: 'United States',
        },
      ]));
  });
});
