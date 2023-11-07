import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
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
  p: number = 1;
  formSearch: FormGroup;

  constructor(private postService: PostService, private loadingController: LoadingController, private formBuilder: FormBuilder, private navController: NavController, private toastController: ToastController) {
    this.post = new Post();
    this.posts = [];

    this.formSearch = this.formBuilder.group(
      {
        'title': ['', Validators.compose([
          Validators.required
        ])],
      });
    }

  async pesquisar(){
    let title = this.formSearch.value.title;
    await this.postService.listar().then((json)=>{
      let posts = <Post[]> (json);
      let found = false;
      for (let post of posts){
        if (post.title === title) {
          this.navController.navigateBack('/item/' + post.id);
          found = true;
        }
      }
      if (!found) {
      this.message('Não foi encontrado nenhum post com esse título.')
      }
    });
    
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

  async message(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000
    });
    toast.present();
  }
  
}
