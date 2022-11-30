import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  faSearch = faSearch;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }
}