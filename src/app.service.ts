import { Injectable } from '@nestjs/common';
import { CsvHeader, CsvBody } from './interface/csvInterface';
const fs = require('fs');
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

@Injectable()
export class AppService {
  getUserData() {
    return new Promise((resolve, reject) => {
      const userDetails = []
      fs.createReadStream('userlist.csv')
        .on('error', (err) => {
          // console.log('error', err)
          reject({ success: false, message: "Error reading csv file", err })
        })
        .pipe(csv())
        .on('data', (row) => {
          userDetails.push(row)
        })
        .on('end', () => {
          resolve({ success: true, data: userDetails })
        })
    })
  }

  saveUserData(userDetail: CsvBody) {
    const header: CsvHeader[] = [
      { id: 'name', title: 'Name' },
      { id: 'educationBackground', title: 'Educational Background' },
      { id: 'email', title: 'Email Address' },
      { id: 'gender', title: 'Gender' },
      { id: 'dob', title: 'Date of Birth' },
      { id: 'nationality', title: 'Nationality' },
      { id: 'phone', title: 'Phone number' },
      { id: 'prefModeContact', title: 'Preferred Contact mode' },
      { id: "address", title: "Address" }
    ]
    const csvWriter = createCsvWriter({
      path: 'userlist.csv',
      header,
      append: true
    });
    const data = [userDetail];

    return csvWriter
      .writeRecords(data)
      .then(() => {
        return {
          success: true,
          message: "The CSV file was written successfully"
        }
      })
  }
}
