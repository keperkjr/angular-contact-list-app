// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 13, 2021
//    Taken From: http://programmingnotes.org/
//    File:  Loading.component.ts
//    Description: Loading typescript
// ============================================================================
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
    imgPath = '../../assets/images/loading.gif';

    constructor() { }

    ngOnInit(): void {
    }

}
