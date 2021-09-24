import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { FileItem } from 'src/app/models/fileItem';
import { AttachmentsService } from 'src/app/services/attachments.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {

  @Input() _type: number;
  @Input() _id: number;

  fileItems: FileItem[]

  constructor(private _attachmentsService: AttachmentsService) { }

  ngOnInit(): void {
    this.getAttachments()
  }
  
  getAttachments() {
    this._attachmentsService.getFileItemByParent(this._id, this._type).subscribe(
      data => {
        if (!data.error) {
          this.fileItems = data.data
        } else {
          console.log(data.description)
        }
      }
    )
  }

  downloadFile(fileItem: FileItem){    
    this._attachmentsService.downloadFileItem(fileItem.id).subscribe(
      data => {
        let blob = new Blob([data], { type: 'application/octet-stream' })
        FileSaver.saveAs(blob, fileItem.name);
      }
    )
  }

  deleteFile(index: number){
    var fileItem = this.fileItems[index]
    this._attachmentsService.deleteFileItem(fileItem.id).subscribe(
      data => {
        if (!data.error) {
          this.fileItems.splice(index, 1)
        } else {
          console.log(data.description)
        }
      }
    )
  }

  onFileChanged(e: any){
    const uploadData = new FormData()
    uploadData.append('uploadFile', e.target.files[0]);
    this._attachmentsService.uploadFile(this._id, this._type, uploadData).subscribe(
      data => {
        if (!data.error) {
          this.fileItems.push({
            id : data.data.id,
            name: data.data.name,
            content: "",
            parent: 0,
            size: 0,
            type: 0
          })
        }
      }
    )
  }

}
