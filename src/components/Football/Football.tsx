import * as React from "react";
import {apply_games_changes, Game, GamesChanges} from "./game";
import ReconnectingWebSocket from "reconnectingwebsocket";
import {webSocketURL} from "../../utils/utils";
import "./football.css";

enum Col {
    order = 'order',
    home = 'home',
    score = 'score',
    away = 'away',
    time = 'time',
    competition = 'competition',
    country = 'country',
    total_matched = 'total_matched',
    total_available = 'total_available',
    win_back = 'win_back',
    win_lay = 'win_lay',
    draw_back = 'draw_back',
    draw_lay = 'draw_lay',
    lose_back = 'lose_back',
    lose_lay = 'lose_lay',
}

const cols = Object.keys(Col).map( (k) => k as any as Col);



const renderCoefficient = (v:number) : React.ReactNode => v ? `${v}` : '';
const renderDollar = (v:number) : React.ReactNode => v ? `${v}$` : '';
const leftAlignItalic : React.CSSProperties = {
    textAlign:"right",
    fontStyle:"italic",
};

const col_info = (x: Col) : {
    title: string,
    value: (x: Game) => React.ReactNode,
    style?: React.CSSProperties,
} => {
    switch (x) {
        case Col.order:
            return {
                title: '№',
                value: (x) =>  x.order + 1 ,
            };

        case Col.home:
            return {
                title: 'Дома',
                value: (x) => x.home,
                style: { textAlign:"center" }
            };

        case Col.away:
            return {
                title: 'В гостях',
                value: (x) =>  x.away,
                style: { textAlign:"center" }
            };

        case Col.score:
            return {
                title: 'Счёт',
                value: (x) =>   x.in_play ?  `${x.score_home} - ${x.score_away}` : '' ,
                style: { textAlign:"center" }
            };

        case Col.time:
            return {
                title: 'Время',
                value: (x) =>   x.time,
                style: { textAlign:"center" }
            };

        case Col.competition:
            return {
                title: 'Чемпионат',
                value: (x) =>  x.competition,
            };

        case Col.country:
            return {
                title: 'Страна',
                value: (x) =>  x.country,
            };

        case Col.total_matched:
            return {
                title: 'В паре',
                value: (x) =>  renderDollar(x.total_matched),
                style: leftAlignItalic,
            };

        case Col.total_available:
            return {
                title: 'Не в паре',
                value: (x) =>  renderDollar(x.total_available),
                style: leftAlignItalic,
            };

        case Col.win_back:
            return {
                title: 'П1+',
                value: (x) =>  renderCoefficient(x.win_back),
                style: leftAlignItalic,
            };

        case Col.win_lay:
            return {
                title: 'П1-',
                value: (x) =>  renderCoefficient(x.win_lay),
                style: leftAlignItalic,
            };

        case Col.draw_back:
            return {
                title: 'Н+',
                value: (x) =>  renderCoefficient(x.draw_back),
                style: leftAlignItalic,
            };

        case Col.draw_lay:
            return {
                title: 'Н-',
                value: (x) =>  renderCoefficient(x.draw_lay),
                style: leftAlignItalic,
            };

        case Col.lose_back:
            return {
                title: 'П2+',
                value: (x) =>  renderCoefficient(x.lose_lay),
                style: leftAlignItalic,
            };

        case Col.lose_lay:
            return {
                title: 'П2-',
                value: (x) =>  renderCoefficient(x.lose_lay),
                style: leftAlignItalic,
            };
    }
};

type sort_dir = 'asc' | 'desc';

interface state {
    ws: ReconnectingWebSocket,
    games: Game []
    sort_col: Col;
    sort_dir: sort_dir;
}

export class Football extends React.Component<{}, state> {

    constructor(props: {}) {
        super(props);
        this.init();
        this.renderHeadCell = this.renderHeadCell.bind(this);
    }

    init() {
        const ws = new ReconnectingWebSocket(webSocketURL('/football'), [], {
            debug: true,
            automaticOpen: false,
        });
        ws.onmessage = (event) => {
            this.setState((x: state): state => {
                const v = apply_games_changes(x.games, new GamesChanges(JSON.parse(event.data)));
                if (typeof v === 'string') {
                    console.error(v);
                    this.state.ws.close();
                    this.init();
                    return this.state;
                }
                return { ...x, games: v, };
            });
        };
        ws.open();
        this.state = {
            ws: ws,
            games: [],
            sort_col: Col.order,
            sort_dir: 'asc',
        }
    }


    static renderCell (c:Col, x:Game) {
        let a = col_info(c);
        return <td key={c} style={{...a.style}} >
            {a.value(x)}
        </td>;
    }

    renderHeadCell (c:Col) {
        let a = col_info(c);
        const [ch, color] =
            this.state.sort_col === c
                ? [ this.state.sort_dir === 'asc' ? '↓' : '↑', 'rgb(85, 85, 85)']
                : ['↕', 'rgb(204, 204, 204)'];
        return <th
            key={c}

            onClick={ (event) => {
                this.setState({...this.state, sort_col: c, sort_dir: this.state.sort_dir === 'asc' ? 'desc' : 'asc'});
            }}
            style={{cursor:'pointer'}} >
            {a.title}
            <span
                style={{
                    color : color,
                    fontWeight:'bold',
                    fontSize:16,
                    fontFamily: 'calibri, helvetica, arial, sans-serif'
                }}>
                {ch}
            </span>
        </th>;
    }

    render() {
        const sortFun = col_info(this.state.sort_col).value;
        let games = this.state.games.slice();
        games.sort( (x, y) => {
            const a :any = sortFun(x);
            const b :any = sortFun(y);
            return ((a < b) ? -1 : (a > b) ? 1 : 0) * (this.state.sort_dir === 'asc' ? 1 : -1);
        });
        return <table className={'football-table'}>
            <thead>
            <tr>
                {cols.map(this.renderHeadCell)}
            </tr>
            </thead>
            <tbody>
            {games.map((x) =>
                <tr key={x.id}>
                    { cols.map((c) => Football.renderCell(c,x) ) }
                </tr>
            )}
            </tbody>
        </table>
    }
}


