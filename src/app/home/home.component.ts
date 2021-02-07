import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../services/youtube.service';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  displayData: any[];
  loading = true;
  $event;

  // Sorting and filtering
  sortName: string | null = null;
  sortValue: string | null = null;
  showPagination: boolean = true;
  event: any;
  listOfSearchName = [];
  searchAddress: string;
  searchValue = '';
  isConnected: any;

  constructor(private youTubeService: YoutubeService, private router: Router) {}

  ngOnInit() {
    // check network status to prevent api call and get from local stoarge ..
    this.checkNetworkStatus().subscribe((isOnline) =>
      isOnline ? this.getAllitems() : this.getFromLocalStorage()
    );
  }

  checkNetworkStatus() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

  getFromLocalStorage() {
    this.isConnected = false;
    this.items = JSON.parse(localStorage.getItem('Videos'));
    this.displayData = this.items;
    this.loading = false;
  }

  getAllitems() {
    this.isConnected = true;
    let listOfTEDxVideos = `Ks-_Mh1QhMc,c0KYU2j0TM4,eIho2S0ZahI,6Af6b_wyiwI,DFjIi2hxxf0,
      zIwLWfaAg-8,9kxL9Cf46VM,KM4Xe6Dlp0Y,8KkKuTCFvzI,GZGY0wPAnus,6UiU99_tE7I,VU44eEKtcmQ,
      8jPQjjsBbIc,P_6vDLq64gE,iG9CE55wbtY,EKBpF2bzpNs,RKK7wGAYP6k,rrkrvAUbU9Y,XFnGhrC_3Gs`;
    this.youTubeService
      .getAllDetailsOfTEDxVideoslist(listOfTEDxVideos)
      .subscribe((res: any) => {
        localStorage.setItem('Videos', JSON.stringify(res.items));
        this.items = res.items;
        this.displayData = this.items;
        this.loading = false;
      });
  }

  /**** Declaration *****/

  /** I didn't use those i prefer to use above api to get all video details in one request , 
  but this is another way to get videos of a youtube channel  .. **/

  getAllVideosofChannel() {
    this.isConnected = true;
    let moshChannelId = 'UCWv7vMbMWH4-V0ZXdmDpPBA';
    let maxResults = 25;
    this.youTubeService
      .getAllVideosOfChannel(moshChannelId, maxResults)
      .subscribe((res: any) => {
        localStorage.setItem('Videos', JSON.stringify(res.items));
        this.items = res.items;
        this.displayData = this.items;
        this.loading = false;
      });
  }

  /** I didn't use those i prefer to use above api to get all video details in one request , 
  but this is another way to get videos of a youtube channel  .. **/

  getVideoDetails(video) {
    if (this.isConnected) {
      this.loading = true;
      this.youTubeService
        .getVideoDetails(video.id.videoId)
        .subscribe((SelectedVideo: any) => {
          this.loading = false;
          localStorage.setItem(
            'SelectedVideo',
            JSON.stringify(SelectedVideo.items[0])
          );
          this.router.navigate(['/video-details']);
        });
    } else {
      localStorage.setItem('SelectedVideo', JSON.stringify(video));
      this.router.navigate(['/video-details']);
    }
  }
  /******* end of declaration  **********/

  shareVideoDetails(video: any) {
    localStorage.setItem('SelectedVideo', JSON.stringify(video));
    this.router.navigate(['/video-details']);
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.sortData();
  }

  reset(): void {
    this.searchValue = '';
    this.sortData();
  }

  sortData(): void {
    /** sort data **/
    if (this.sortName) {
      const data = this.displayData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1
      );
      this.displayData = [...data];
    } else {
      this.displayData = this.items;
      this.currentPageDataChange(this.$event);
    }
  }

  currentPageDataChange($event: any[]) {
    this.$event = $event;
    this.displayData = $event;
  }

  onSearchChange() {
    if (this.searchValue !== '') {
      this.showPagination = false;
      this.displayData = this.displayData.filter((ass) =>
        String(ass.snippet.title)
          .toUpperCase()
          .includes(String(this.searchValue).toUpperCase())
      );
    } else {
      this.displayData = this.items;
      this.displayData = [...this.displayData]; // refresh
      this.showPagination = true;
      this.currentPageDataChange(this.event);
      this.reset();
      this.isConnected ? this.getAllitems() : this.getFromLocalStorage();
    }
  }
}
