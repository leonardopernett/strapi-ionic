import { Component } from '@angular/core';
import {PostService} from '../services/post.service'
import {AlertController} from '@ionic/angular'
import{Router} from '@angular/router'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage  {
  posts = []
  constructor(private router:Router ,private postService: PostService, private alertController:AlertController) { }


  ionViewWillEnter(){
    this.getPosts()
  }


  getPosts(){
    this.postService.getAllPost().subscribe(
      (res:any)=>{
        this.posts=res
      },
      err=>console.log(err)
    )
  }

  async deletePost(id:number){
    const alert:any = await this.alertController.create({
      header:'Information',
      message:'Are you sure that delete it?',
      buttons:[{
        text:'Okay',
        handler:()=>{
          this.postService.deletePost(id).subscribe(
            (res)=>this.getPosts(),
            (err)=>console.log(err)
           )
        
        }
      },"cancel"]
    })
    await alert.present();

  
  }

  editPost(id){
    this.router.navigate(['post/edit',id])
  }
}

