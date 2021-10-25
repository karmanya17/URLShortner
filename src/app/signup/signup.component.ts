import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { user } from '../model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup
  constructor(private userService:UserService) {
    this.signupForm=new FormGroup({
      'username':new FormControl('', Validators.required),
      'password':new FormControl('', Validators.required),
      'confirmpassword':new FormControl('', Validators.required),
      'dob':new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
    
  }
  submit(){
    if(this.signupForm.value.password===this.signupForm.value.confirmpassword){
      //console.log(this.signupForm.value)
      this.signupForm.removeControl('confirmpassword');
      this.userService.registerUser(this.signupForm.value).subscribe((data)=>{
        alert("User Created Successfully")
      },(err)=>{
        console.log(err)
      })
    }
    else
    {
      alert("Password Mismatched")
    }
    

  }

}
