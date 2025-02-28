<!doctype html>
<html lang="en">
   <script>
    
import gql from 'graphql-tag';

export const GET_IDOMOO_VIDEO = gql`
  query GetIdomooVideo($videoId: ID!) {
    idomooVideo(id: $videoId) {
      id
      url
      title
      status
    }
  }
`;
+++++++++++++++++++++++++++++++++++++++++++++++
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_IDOMOO_VIDEO } from './graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class IdomooService {
  constructor(private apollo: Apollo) {}

  getVideo(videoId: string): Observable<any> {
    return this.apollo
      .query({
        query: GET_IDOMOO_VIDEO,
        variables: { videoId },
      })
      .pipe(map((result: any) => result.data?.idomooVideo));
  }
}
+++++++++++++++++++++++++++++++++++++++++++++
import { Component, OnInit } from '@angular/core';
import { IdomooService } from '../idomoo.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  video: any;
  loading = true;
  error: any;

  constructor(private idomooService: IdomooService) {}

  ngOnInit(): void {
    this.idomooService.getVideo('some-video-id').subscribe({
      next: (data) => {
        this.video = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    });
  }
}
++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<div *ngIf="loading">Loading video...</div>
<div *ngIf="error">Error: {{ error.message }}</div>
<div *ngIf="video && !loading && !error">
  <h2>{{ video.title }}</h2>
  <video controls [src]="video.url" width="640" height="360">
    Your browser does not support the video tag.
  </video>
</div>
+++++++++++++++++++++++++++++++++++++++++++++++++++++
<app-video-player></app-video-player>
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Video {
    id: ID!
    url: String!
    title: String
    status: String
  }
  type Query {
    idomooVideo(id: ID!): Video
  }
`;

const resolvers = {
  Query: {
    idomooVideo: async (_, { id }) => {
      const response = await axios.get(
        `https://api.idomoo.com/v2/videos/${id}`,
        {
          auth: {
            username: 'YOUR_USERNAME',
            password: 'YOUR_PASSWORD',
          },
        }
      );
      return {
        id: response.data.id,
        url: response.data.url,
        title: response.data.title,
        status: response.data.status,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
++++++++++++++++++++++++++++++++++++++++++++++++++++

   </script>
</html>
