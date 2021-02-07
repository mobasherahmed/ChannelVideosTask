import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css'],
})
export class DocsComponent implements OnInit {
  content = [
    {
      title: 'Overview',
      desc: `This App displaying list of videos from TEDx Channel ,
      <span class="highlite">First page </span> is the home page that displaying
      the list in a table view including
      (Title – Thumbnail – Date - View Details button) ,
      Search bar above table for search by video title and sorting each
      column descend or asecend also table pagination for multi pages,
      <span class="highlite">Second page</span> is the video details showing all video details including
      (# of likes - # of dislikes - # of viewers - # of comments - Title -
      Thumbnail – Date - Duration of video - Description)
      With the option to add video to favourite list and also rating it .`,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
