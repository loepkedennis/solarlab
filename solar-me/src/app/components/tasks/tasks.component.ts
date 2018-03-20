import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
/*
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Board } from './board';
import { ColumnList } from './columnlist';
 
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board;
  columns: ColumnList[];
  editingName = false;
  currentName: string;

  constructor(public el: ElementRef,
    private _router: Router,
    private _route: ActivatedRoute,
    private http: Http) { }

  ngOnInit() {
    let boardId = this._route.snapshot.params['id'];
    this.board = new Board();
    this.board.name = "test";
    this.http.get('https://api.trello.com/1/boards/'+ boardId +'/lists?key=3c32ffbd96aecebb35a2f366ece4bfc6&token=0a59dc6f9dee43b6a8d85dc6ceddee57ff7ca823159118f2088dc14e58ed11c7').map((response: Response) => response.json()).subscribe(columns => {this.columns = columns;
    console.log(columns.sort(function(obj1, obj2) {
      return obj1.pos - obj2.pos;}));
    this.initCards(this.columns);
  });
    
  }

   initCards(columns: ColumnList[] ){
    for (let entry of columns) {
      this.http.get('https://api.trello.com/1/lists/'+ entry.id +'/cards?key=3c32ffbd96aecebb35a2f366ece4bfc6&token=0a59dc6f9dee43b6a8d85dc6ceddee57ff7ca823159118f2088dc14e58ed11c7').map((response: Response) => response.json()).subscribe(test => {
      console.log(test);
      console.log(entry.name);
    }); // 1, "string", false
    }

  }

  editTitle() {
    this.currentName = this.board.name;
    this.editingName = true;

    let input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

}

*/