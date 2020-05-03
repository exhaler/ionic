import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType,
} from "@capacitor/core";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker', { static: false }) filePicker: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string>();
  selectedImage: string;
  userPicker = false;

  constructor(private platform: Platform) {}

  ngOnInit() {
    if (
      (this.platform.is("mobile") && !this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.userPicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera") || this.userPicker) {
      this.filePicker.nativeElement.click();
      return;
    }

    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64,
    })
      .then((image) => {
        this.selectedImage = image.base64String;
        this.imagePick.emit(image.base64String);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  onFileChosen(event: Event) {
    console.log(event);
  }
}
