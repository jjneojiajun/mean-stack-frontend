import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: "This is the first's post content"},
  //   {title: 'Second Post', content: "This is the second's post content"},
  //   {title: 'Third Post', content: "This is the third's post content"},
  // ]

  @Input() posts: Post[] = []; 
  private postsSub: Subscription;

  constructor(public postsService: PostsService) { 

  }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
