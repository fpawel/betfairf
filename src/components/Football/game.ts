import {ParseDate, ToObject} from "../../utils/golang_typescriptify_helpers";

// struct2ts:github.com/fpawel/betfairs/football/football2.Game
export class Game {
    id: number;
    order: number;
    home: string;
    away: string;
    score_home: number;
    score_away: number;
    in_play: boolean;
    time: string;
    competition: string;
    country: string;
    open_date: Date;
    win_back: number;
    win_lay: number;
    lose_back: number;
    lose_lay: number;
    draw_back: number;
    draw_lay: number;
    total_matched: number;
    total_available: number;
    error: string;

    get Score(): string {
        return this.in_play ? `${this.score_home} - ${this.score_away}` : '';
    }

    get Order(): number {
        return this.order + 1;
    }

    constructor(data?: any) {

        const d: any = (data && typeof data === 'object') ? ToObject(data) : {};
        this.id = ('id' in d) ? d.id as number : 0;
        this.order = ('order' in d) ? d.order as number : 0;
        this.home = ('home' in d) ? d.home as string : '';
        this.away = ('away' in d) ? d.away as string : '';
        this.score_home = ('score_home' in d) ? d.score_home as number : 0;
        this.score_away = ('score_away' in d) ? d.score_away as number : 0;
        this.in_play = ('in_play' in d) ? d.in_play as boolean : false;
        this.time = ('time' in d) ? d.time as string : '';
        this.competition = ('competition' in d) ? d.competition as string : '';
        this.country = ('country' in d) ? d.country as string : '';
        this.open_date = ('open_date' in d) ? ParseDate(d.open_date) : new Date();
        this.win_back = ('win_back' in d) ? d.win_back as number : 0;
        this.win_lay = ('win_lay' in d) ? d.win_lay as number : 0;
        this.lose_back = ('lose_back' in d) ? d.lose_back as number : 0;
        this.lose_lay = ('lose_lay' in d) ? d.lose_lay as number : 0;
        this.draw_back = ('draw_back' in d) ? d.draw_back as number : 0;
        this.draw_lay = ('draw_lay' in d) ? d.draw_lay as number : 0;
        this.total_matched = ('total_matched' in d) ? d.total_matched as number : 0;
        this.total_available = ('total_available' in d) ? d.total_available as number : 0;
        this.error = ('error' in d) ? d.error as string : '';
    }

    toObject(): any {
        const cfg: any = {};
        cfg.id = 'number';
        cfg.order = 'number';
        cfg.score_home = 'number';
        cfg.score_away = 'number';
        cfg.open_date = 'string';
        cfg.win_back = 'number';
        cfg.win_lay = 'number';
        cfg.lose_back = 'number';
        cfg.lose_lay = 'number';
        cfg.draw_back = 'number';
        cfg.draw_lay = 'number';
        cfg.total_matched = 'number';
        cfg.total_available = 'number';
        return ToObject(this, cfg);
    }

    applyGameChanges(a: GameChanges) {
        if (a.order)
            this.order = a.order;
        if (a.score_home)
            this.score_home = a.score_home;
        if (a.score_away)
            this.score_away = a.score_away;
        if (a.in_play)
            this.in_play = a.in_play;
        if (a.time)
            this.time = a.time;
        if (a.competition)
            this.competition = a.competition;
        if (a.country)
            this.country = a.country;
        if (a.win_back)
            this.win_back = a.win_back;
        if (a.win_lay)
            this.win_lay = a.win_lay;
        if (a.draw_back)
            this.draw_back = a.draw_back;
        if (a.draw_lay)
            this.draw_lay = a.draw_lay;
        if (a.lose_back)
            this.lose_back = a.lose_back;
        if (a.lose_lay)
            this.lose_lay = a.lose_lay;
        if (a.total_matched)
            this.total_matched = a.total_matched;
        if (a.total_available)
            this.total_available = a.total_available;
        if (a.error)
            this.error = a.error;
    };
}


// struct2ts:github.com/fpawel/betfairs/football/football2.GameChanges
export class GameChanges {
    id: number;
    order: number | null;
    score_home: number | null;
    score_away: number | null;
    in_play: boolean | null;
    time: string | null;
    competition: string | null;
    country: string | null;
    win_back: number | null;
    win_lay: number | null;
    draw_lay: number | null;
    draw_back: number | null;
    lose_lay: number | null;
    lose_back: number | null;
    total_matched: number | null;
    total_available: number | null;
    error: string | null;

    constructor(data?: any) {
        const d: any = (data && typeof data === 'object') ? ToObject(data) : {};
        this.id = ('id' in d) ? d.id as number : 0;
        this.order = ('order' in d) ? d.order as number : null;
        this.score_home = ('score_home' in d) ? d.score_home as number : null;
        this.score_away = ('score_away' in d) ? d.score_away as number : null;
        this.in_play = ('in_play' in d) ? d.in_play as boolean : null;
        this.time = ('time' in d) ? d.time as string : null;
        this.competition = ('competition' in d) ? d.competition as string : null;
        this.country = ('country' in d) ? d.country as string : null;
        this.win_back = ('win_back' in d) ? d.win_back as number : null;
        this.win_lay = ('win_lay' in d) ? d.win_lay as number : null;
        this.draw_lay = ('draw_lay' in d) ? d.draw_lay as number : null;
        this.draw_back = ('draw_back' in d) ? d.draw_back as number : null;
        this.lose_lay = ('lose_lay' in d) ? d.lose_lay as number : null;
        this.lose_back = ('lose_back' in d) ? d.lose_back as number : null;
        this.total_matched = ('total_matched' in d) ? d.total_matched as number : null;
        this.total_available = ('total_available' in d) ? d.total_available as number : null;
        this.error = ('error' in d) ? d.error as string : null;
    }

    toObject(): any {
        const cfg: any = {};
        cfg.id = 'number';
        cfg.order = 'number';
        cfg.score_home = 'number';
        cfg.score_away = 'number';
        cfg.win_back = 'number';
        cfg.win_lay = 'number';
        cfg.draw_lay = 'number';
        cfg.draw_back = 'number';
        cfg.lose_lay = 'number';
        cfg.lose_back = 'number';
        cfg.total_matched = 'number';
        cfg.total_available = 'number';
        return ToObject(this, cfg);
    }
}


// struct2ts:github.com/fpawel/betfairs/football/football2.GamesChanges
export class GamesChanges {
    reset: boolean;
    new: Game[];
    out: number[];
    upd: GameChanges[];

    constructor(data?: any) {
        const d: any = (data && typeof data === 'object') ? ToObject(data) : {};
        this.reset = ('reset' in d) ? d.reset as boolean : false;
        this.new = Array.isArray(d.new) ? d.new.map((v: any) => new Game(v)) : [];
        this.out = ('out' in d) ? d.out as number[] : [];
        this.upd = Array.isArray(d.upd) ? d.upd.map((v: any) => new GameChanges(v)) : [];
    }

    toObject(): any {
        const cfg: any = {};
        return ToObject(this, cfg);
    }
}

export function apply_games_changes(games: Game[], gamesChanges: GamesChanges) {

    const u = getGamesChanges(gamesChanges);

    let nextGames = gamesChanges.new;

    games.filter((game) => {
        return !(u.out.has(game.id) || u.new.has(game.id));
    }).map((game) => {
        const gameChanges = u.upd.get(game.id);
        if (gameChanges) {
            game.applyGameChanges(gameChanges);
        }
        return game;
    }).forEach((game) => nextGames.push(game));
    nextGames.sort((x, y) => x.order - y.order);

    let id_game = new Map<number, Game>();
    for (let x of nextGames) {
        const y = id_game.get(x.id);
        if (y) {
            const formatGame = (x: Game) => `$${x.order} ${x.home} ${x.away}`;
            throw (`Assert unique game id: ${formatGame(x)} and ${formatGame(y)}`);
        }
        id_game.set(x.id, x);
    }

    return nextGames;
}


function getGamesChanges(x: GamesChanges) {
    let r = {
        out: new Set<number>(),
        new: new Map<number, Game>(),
        upd: new Map<number, GameChanges>(),
    };


    if (x.out) {
        for (let value of x.out) {
            r.out.add(value);
        }
    }

    if (x.new) {
        for (let value of x.new) {
            r.new.set(value.id, value);
        }
    }

    if (x.upd) {
        for (let value of x.upd) {
            r.upd.set(value.id, value);
        }
    }
    return r;
}


