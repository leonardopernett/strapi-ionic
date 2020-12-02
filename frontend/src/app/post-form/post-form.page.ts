import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import {ActivatedRoute, Router} from '@angular/router'
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.page.html',
  styleUrls: ['./post-form.page.scss'],
})
export class PostFormPage implements OnInit {
  post={
    id:null,
    title:"",
    subtitle:"",
    description:""
  }

  edit:boolean = false;

  constructor(private activateRouter:ActivatedRoute ,private postService:PostService, private router:Router) { }

  ngOnInit() {
    this.activateRouter.params.subscribe((param)=>{
     
        if(param.id){
          this.edit= true
          this.postService.getOnePost(param.id).subscribe((res:any)=>{
              this.post=res
              this.post.id=param.id
            
          }, err=>console.log(err))
        }

      }
    )

    

  }
  createPost(title, description, subtitle){
    const post ={
      title:title.value, 
      subtitle: subtitle.value,
      description:description.value, 
    }

    this.postService.savePost(post).subscribe(
      (res)=>{
        console.log(res)
        this.router.navigate(['/posts'])
        this.edit= false
      },
      err=>console.log(err)
    )
  }


  updatePost(title, description, subtitle){
    const post ={
      title:title.value, 
      subtitle: subtitle.value,
      description:description.value, 
    }

    this.postService.updatePost(this.post.id, post).subscribe(
      res=>{
        this.router.navigate(['/posts'])
      },
      err=>console.log(err)
      
    )
  }

}
