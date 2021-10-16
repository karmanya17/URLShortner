import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SortURLService } from '../sort-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from '../model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  UrlData:Array<url>=[];
  successflag=0;
  UrlObject={
    "longURL":"",
    "short":"",
    "count":0
  }
  shortUrl:FormGroup
  constructor(private ShortUrlService:SortURLService) { 
    this.shortUrl = new FormGroup({
      'longURL': new FormControl('', Validators.required),
    })
  }
  
  ngOnInit(): void {
    this.loadData();
    console.log(this.UrlData);
  }
  loadData(){
    this.ShortUrlService.getAllURL().subscribe((data) => {
      console.log(data);
      this.UrlData=data;
    },() => {
      alert("Something Went Wrong")
    })

  }
  generateShort(){
    let rndResult="";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEF"
    "GHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength=characters.length;
    for(let i=0;i<5;i++)
    { 
      rndResult+=characters.charAt(Math.floor(Math.random()*charactersLength))
    }
    return rndResult;
  }

  submitURL(){
    Object.keys(this.shortUrl.controls).forEach(field => {
      const control = this.shortUrl.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.shortUrl.valid){
      console.log(this.shortUrl.value);
      this.UrlObject={
        "longURL":this.shortUrl.value.longURL,
        "short":this.generateShort(),
        "count":0
      }
      this.ShortUrlService.saveURL(this.UrlObject).subscribe(() => {
        this.successflag=1;
        this.loadData();
        console.log(this.UrlData);
      },() => {
        alert("Something Went Wrong")
      })
      
    }
    

  }


}
