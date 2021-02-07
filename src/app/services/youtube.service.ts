import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  apiKey: string = 'AIzaSyA-ZbHJVTp9soim2YzlWuWoVx9MbqJtSBk';

  constructor(private http: HttpClient) {}

  getAllDetailsOfTEDxVideoslist(Id): Observable<any> {
    let getRelatedListOfVideosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${Id}&key=${this.apiKey}`;
    return this.http.get(getRelatedListOfVideosUrl);
  }

  /** I didn't use those i prefer to use above api to get all video details in one request , 
  but this is another way to get videos of a youtube channel  .. **/

  getAllVideosOfChannel(channelId, maxResults): Observable<any> {
    let getAllChannelVideosUrl = `https://www.googleapis.com/youtube/v3/search?
    key=${this.apiKey}&channelId=${channelId}&order=date&part=snippet&type=video,id&
    maxResults=${maxResults}`;
    return this.http.get(getAllChannelVideosUrl);
  }
  getVideoDetails(videoId): Observable<any> {
    let url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${this.apiKey}
    &part=snippet,contentDetails,statistics,status`;
    return this.http.get(url);
  }
}
