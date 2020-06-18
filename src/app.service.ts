import { Injectable } from '@nestjs/common';
import { CsvHeader, CsvBody } from './interface/csvInterface';
const fs = require('fs');
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

@Injectable()
export class AppService {
  private header: CsvHeader[] = [
    { id: "_id", title: "_id" },
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
  getUserData(): Promise<{}> {
    return new Promise((resolve, reject) => {
      const userDetails = []
      fs.createReadStream('userlist.csv')
        .on('error', (err) => {
          reject({ success: false, message: "Error getting data" })
        })
        .pipe(csv())
        .on('data', (row) => {
          userDetails.push(row)
        })
        .on('end', () => {
          console.log(userDetails)
          resolve({ success: true, data: userDetails })
        })
    })
  }

  saveUserData(userDetail: CsvBody): Promise<{}> {
    userDetail._id = this.generateRandomId()
    return new Promise((resolve, reject) => {
      fs.createReadStream('userlist.csv')
        .on('data', () => {
          const csvWriter = createCsvWriter({
            path: 'userlist.csv',
            header: this.header,
            append: true
          });
          const data = [userDetail];
          csvWriter
            .writeRecords(data)
            .then(() => {
              resolve({
                success: true,
                message: "Data saved successfully"
              })
            })
        })
        .on('error', () => {
          const csvWriter = createCsvWriter({
            path: 'userlist.csv',
            header: this.header,
          });
          const data = [userDetail];
          return csvWriter
            .writeRecords(data)
            .then(() => {
              resolve({
                success: true,
                message: "Data saved successfully"
              })
            })
        })
    })


  }

  private generateRandomId(): string {
    const length = 5
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ""
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }
}
