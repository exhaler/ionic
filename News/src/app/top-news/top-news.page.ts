import { Component, OnInit } from "@angular/core";
import { NewsService } from "../services/news.service";

@Component({
  selector: "app-top-news",
  templateUrl: "./top-news.page.html",
  styleUrls: ["./top-news.page.scss"],
})
export class TopNewsPage implements OnInit {
  news: any;

  constructor(private newService: NewsService) {}

  ngOnInit() {
    // change country to geolocation
    this.news = this.newService.getData("top-headlines?country=us");
  }
}
