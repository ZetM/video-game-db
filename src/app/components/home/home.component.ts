import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { APIResponse, Game } from 'src/app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games!: Array<Game>; 
  private routeSub!: Subscription;
  private gamesSub!: Subscription;


  constructor(
    private router: Router,
    private HttpService: HttpService,
    private ActivatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params)=> {
      if (params['games-search']){
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(sort: string, search?: string): void {
    this.gamesSub = this.HttpService.getGameList(sort, search)
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList);
    })
  }

  openGameDetails(id: string): void{
    this.router.navigate(['details',id]);
  }

  ngOnDestroy(): void{
    if(this.gamesSub){
      this.gamesSub.unsubscribe();
    }
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
