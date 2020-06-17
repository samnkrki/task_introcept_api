import { Injectable } from '@nestjs/common';
import { CsvHeader, CsvBody } from './interface/csvInterface';
import { resolve } from 'path';
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
        .pipe(csv({ columns: true }))
        .on('data', (row) => {
          userDetails.push(row)
        })
        .on('end', () => {
          console.log(userDetails)
          resolve({ success: true, data: userDetails })
        })
    })
  }

  saveUserData(userDetail: CsvBody) {
    const header: CsvHeader[] = [
      { id: 'name', title: 'name' },
      { id: 'educationBackground', title: 'educationBackground' },
      { id: 'email', title: 'email' },
      { id: 'gender', title: 'gender' },
      { id: 'dob', title: 'dob' },
      { id: 'nationality', title: 'nationality' },
      { id: 'phone', title: 'phone' },
      { id: 'prefModeContact', title: 'prefModeContact' },
      { id: "address", title: "address" }
    ]
    return new Promise((resolve, reject) => {
      fs.createReadStream('userlist.csv')
        .on('data', () => {
          const csvWriter = createCsvWriter({
            path: 'userlist.csv',
            header,
            append: true
          });
          const data = [userDetail];
          csvWriter
            .writeRecords(data)
            .then(() => {
              resolve({
                success: true,
                message: "The CSV file was written successfully"
              })
            })
        })
        .on('error', () => {
          const csvWriter = createCsvWriter({
            path: 'userlist.csv',
            header,
          });
          const data = [userDetail];
          return csvWriter
            .writeRecords(data)
            .then(() => {
              resolve({
                success: true,
                message: "The CSV file was written successfully for the first time"
              })
            })
        })
    })


  }
}
