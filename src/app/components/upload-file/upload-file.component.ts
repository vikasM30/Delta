import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/service/upload-file.service';
import { AfterSessionExpired } from 'src/app/shell/interfaces/after-data-fetch';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  uploadFile :  object = new Object();
  uploadFileList : Array<any>;
  userDetails : any;
  indexOfDetail = null;
  showLoader :boolean;
  downloadLink :String;
  sample={
    ECRquarter:'',
    ECRNumber:'',
  }
  constructor(private uploadFileService : UploadFileService) { 
    this.uploadFileList = new Array<any>();
    this.downloadLink = this.uploadFileService.fileUrl;
    
  }

  ngOnInit() {
    this.showLoader = true;
    this.getUserDetail();
    this.getFile();
    this.indexOfDetail = this.uploadFileList.length;
  }
  /**
   * To get Selected file on Change
   * @param file event and uploaded file Detail
   */
  uploadFileInput(file){
    const date = new Date();
    const fileDate = date.getDate()+'-'+ (date.getMonth()+1)+'-'+ date.getFullYear();
    const fileDetail = {
      username : this.userDetails.unique_name,
      filename   : file[0].name,
      SynchronizedOn   : fileDate,
      status : 'Pending' 
    }
    this.uploadFile = fileDetail;
    //this.uploadFileList.push(fileDetail);
    this.uploadFileToActivity(file,fileDetail)
  }

  uploadFileToActivity(file,fileDetail) {
    this.showLoader = true;
    this.indexOfDetail =  this.uploadFileList.length;
    this.uploadFileList.push(fileDetail);
    this.uploadFileService.postFile(file,fileDetail).subscribe(data => {
        //this.uploadFileList[this.indexOfDetail].status = "Completed";
        //this.showLoader = false;
        this.getFile();
      }, error => {
        this.uploadFileList[this.indexOfDetail].status = "Failed";
        console.log(error);
        this.showLoader = false;
      });
  }
  getFile() {
    this.uploadFileService.getFile().subscribe((data) => {
      this.uploadFileList = data;
      this.showLoader = false;
    },error => {
      this.showLoader = false;
        console.log(error);
    });
  }
  getUserDetail(){
    const encriptCode = sessionStorage.getItem('Authorization').split(' ')[1].split('.')[1];
    this.userDetails = JSON.parse(atob(encriptCode));
  }
  deletefile(fileId,index){
    this.showLoader = true;
    this.uploadFileService.deleteFileRecored(fileId).subscribe((data) => {
      this.uploadFileList.splice(index,1);
      this.showLoader = false;
    },error => {
        console.log(error);
        this.showLoader = false;
    });
  }

  // downloadFile(fileId,index){
  //   this.showLoader = true;
  //   this.uploadFileService.downloadFileRecored(fileId).subscribe((data) => {
  //     //this.uploadFileList.splice(index,1);
  //     console.log(data);
  //     this.showLoader = false;
  //   },error => {
  //       console.log(error);
  //       this.showLoader = false;
  //   });
  // }
}
