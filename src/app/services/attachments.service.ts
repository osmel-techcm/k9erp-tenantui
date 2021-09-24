import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../config/globals';
import { responseData } from '../models/responseData';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(private http: HttpClient, private _global: Globals) { }

  uploadFile(parent: number, type: number, data: FormData){
    return this.http.post<responseData>(this._global.apiUrlDriveManager + "api/FileItem?parent=" + parent + "&type=" + type, data)
  }

  getFileItemByParent(parent: number, type: number){
    return this.http.get<responseData>(this._global.apiUrlDriveManager + "api/FileItem/GetFileItemByParent?parent=" + parent + "&type=" + type)
  }

  downloadFileItem(id: number){
    return this.http.get<any>(this._global.apiUrlDriveManager + "api/FileItem/DownloadFileItem?id=" + id, {
      responseType: 'blob' as 'json'
    })
  }

  deleteFileItem(id: number){
    return this.http.delete<responseData>(this._global.apiUrlDriveManager + "api/FileItem/" + id)
  }

  uploadCompanyFile(uploadData: FormData) {
    return this.http.post<responseData>(this._global.apiUrlDriveManager + "api/FileItem/uploadCompanyFile", uploadData)
  }

  getCompanyFile() {
    return this.http.get<responseData>(this._global.apiUrlDriveManager + "api/FileItem/getCompanyFile")
  }
}
