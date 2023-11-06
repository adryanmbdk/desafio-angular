import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  post: Post;
  posts: Post[];

  constructor(private postService: PostService, private loadingController: LoadingController) {
    this.post = new Post();
    this.posts = [];
  }

  ngOnInit() {
    console.log(this.postService.listar());
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();
    await this.postService.listar().then((json)=>{
      this.posts = <Post[]> (json);
    });
    this.fecharLoader();
  }


  exibirLoader() {
    this.loadingController.create()
    .then((res) => {
      res.present();
    })
  }


  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }
  
}
