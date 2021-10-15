import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortURLService } from '../sort-url.service';
@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.css']
})
export class RedirectPageComponent implements OnInit {

  short:string="";
  UrlObject={
    "longURL":"",
    "short":"",
    "count":0
  }
  constructor(private activeRoute: ActivatedRoute,private router:Router,private ShortUrlService:SortURLService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramsData) => {
      this.short = paramsData.id;
      console.log(this.short);
      this.ShortUrlService.getAllURL().subscribe((data) => {
        console.log(data)
        data.forEach((url)=>{
          if(url.short===this.short)
          {
            console.log(url.id);
            console.log(url.short);
            this.UrlObject={
              "longURL":url.longURL,
              "short":url.short,
              "count":url.count+1
            }
            this.ShortUrlService.updateUrlById(this.UrlObject,url.id).subscribe((data)=>{
              console.log(data);
             window.location.href = this.UrlObject.longURL;
            })

          }
        })
        
      })
    })
  }

}
