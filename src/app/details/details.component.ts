import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  video: any;
  alreadyFav: boolean;
  videoRate: number = 0;
  indexOf: number;
  constructor() {}

  ngOnInit(): void {
    this.video = JSON.parse(localStorage.getItem('SelectedVideo'));
    this.checkFavourite();
    this.getRate();
  }

  // check that video is on fav list or not ..
  checkFavourite() {
    let FavArr = JSON.parse(localStorage.getItem('FavVideos'));
    if (FavArr) {
      if (FavArr.includes(this.video.id)) {
        this.alreadyFav = true;
      } else {
        this.alreadyFav = false;
      }
    }
  }

  getRate() {
    let Rating = JSON.parse(localStorage.getItem('Rating'));
    if (Rating) {
      Rating.forEach((element) => {
        if (element.video_id === this.video.id) {
          let indexOf = Rating.indexOf(element);
          this.videoRate = Rating[indexOf].rate;
        }
      });
    }
  }

  AddVideoToFavourites(id) {
    var existing = JSON.parse(localStorage.getItem('FavVideos'));
    if (existing) {
      // check if video already existed in fav arr to prevent duplication ..
      if (existing.includes(id)) {
        return;
      } else {
        let data = JSON.parse(localStorage.getItem('FavVideos'));
        data.push(id);
        localStorage.setItem('FavVideos', JSON.stringify(data));
        this.alreadyFav = true;
      }
    } else {
      localStorage.setItem('FavVideos', JSON.stringify([id]));
      this.alreadyFav = true;
    }
  }

  updateVideoRate(existedRate, id) {
    existedRate.forEach((element) => {
      if (element.video_id === id) {
        this.indexOf = existedRate.indexOf(element);
      }
    });
    let newdata = JSON.parse(localStorage.getItem('Rating'));
    newdata[this.indexOf].rate = this.videoRate;
    localStorage.setItem('Rating', JSON.stringify(newdata));
  }

  storeVideoRate(id) {
    let existedRate = JSON.parse(localStorage.getItem('Rating'));
    if (existedRate) {
      const found = existedRate.some((el) => el.video_id === id);
      if (found) {
        // update rate of video if it has a rate before ...
        this.updateVideoRate(existedRate, id);
      } else {
        let data = JSON.parse(localStorage.getItem('Rating'));
        data.push({ video_id: id, rate: this.videoRate });
        localStorage.setItem('Rating', JSON.stringify(data));
      }
    } else {
      localStorage.setItem(
        'Rating',
        JSON.stringify([{ video_id: id, rate: this.videoRate }])
      );
    }
  }
}
