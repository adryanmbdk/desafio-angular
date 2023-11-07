import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  id: number;
  post: Post;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.post = new Post();
    this.RecuperarPost();
   }

  ngOnInit() {
  }

  async RecuperarPost(){
    await this.postService.procurarPorId(this.id).then((json) => {
      this.post = <Post>(json);
    });
  }


}
