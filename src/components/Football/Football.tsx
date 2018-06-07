import * as React from "react";
import {apply_games_changes, Game, GamesChanges} from "./game";
import ReconnectingWebSocket from "reconnectingwebsocket";
import {webSocketURL} from "../../utils/utils";
import ReactTable, {Resize, RowInfo} from 'react-table';
import {Column, TableCellRenderer} from 'react-table';

interface state {
    ws : ReconnectingWebSocket,
    games : Game []
}

const cellMoney : TableCellRenderer = row => (
    <div style={{
        width: '100%',
        fontStyle: 'italic',
        textAlign: 'right',
    }}>
        {row.value ? row.value : ''} {row.value ? '$' : ''}
    </div>
);

const cellCoeff : TableCellRenderer = row => (
    <div style={{
        width: '100%',
        textAlign: 'right',
    }}>
        {row.value ? row.value : ''}
    </div>
);

const columns : Column[] = [
    {
        Header:'№',
        accessor:'Order',
        width : 40,
    },
    {
        Header:'Дома',
        accessor:'home',
    },
    {
        Header:'Счёт',
        accessor:'Score',
        width : 70,
    },
    {
        Header:'В гостях',
        accessor:'away',
    },
    {
        Header:'Чемпионат',
        accessor:'competition',
        width : 200,
    },
    {
        Header:'Страна',
        accessor:'country',
        width : 120,
    },
    {
        Header:'В паре',
        accessor:'total_matched',
        Cell: cellMoney,
        width : 70,
    },
    {
        Header:'Не в паре',
        accessor:'total_available',
        Cell: cellMoney,
        width : 70,
    },
    {
        Header:'П1+',
        accessor:'win_back',
        Cell: cellCoeff,
        width : 70,
    },
    {
        Header:'П1-',
        accessor:'win_lay',
        Cell: cellCoeff,
        width : 70,
    },
    {
        Header:'Н+',
        accessor:'draw_back',
        Cell: cellCoeff,
        width : 70,
    },
    {
        Header:'Н-',
        accessor:'draw_lay',
        Cell: cellCoeff,
        width : 70,
    },
    {
        Header:'П+',
        accessor:'win_back',
        Cell: cellCoeff,
        width : 70,
    },
    {
        Header:'П2-',
        accessor:'lose_back',
        Cell: cellCoeff,
        width : 70,
    },

    {
        Header:'П2+',
        accessor:'lose_lay',
        Cell: cellCoeff,
        width : 70,
    },
];



export class Football extends React.Component<{}, state> {

    constructor(){
        let x = {
            ws : new ReconnectingWebSocket(webSocketURL('/football'), [], {
                debug: true,
                automaticOpen: false,
            }),
            games : []
        };
        x.ws.onmessage = (event) => {
            this.setState( (prev) : state =>{
                return {
                    ws:prev.ws,
                    games:apply_games_changes(prev.games, new GamesChanges(JSON.parse(event.data))),
                };
            });
        };

        x.ws.open();

        super(x);
        this.state = x;
    }

    render() {
        const border = 'solid 1px #bababa';
        return <ReactTable
            className={'-striped'} columns={columns} data={this.state.games}
            getTrProps = {(finalState: any, rowInfo?: RowInfo, column?: undefined, instance?: any) => {
                return {
                    style: {
                        background: (rowInfo && rowInfo.viewIndex % 2 ) ? "#e4e4e4" : undefined
                    }
                };

            }}
            getTdProps = {(finalState: any, rowInfo?: RowInfo, column?: Column, instance?: any) => {
                return {
                    style: {
                        borderLeft:border,
                        borderRight: column && column.id === 'lose_lay' ? border : undefined,
                        borderTop:border,
                        borderBottom: rowInfo && (rowInfo.viewIndex === rowInfo.pageSize-1) ? border : undefined,
                        padding:'2px 4px',
                    }
                };

            }}
            getTheadThProps = {(finalState: any, rowInfo?: RowInfo, column?: Column, instance?: any) => {
                return {
                    style: {
                        borderTop:border,
                        borderLeft:border,
                        borderRight: column && column.id === 'lose_lay' ? 'solid 1px #bababa' : undefined,
                        padding:'2px 4px',
                    }
                };

            }}
            defaultPageSize={20}
            pageSizeOptions = { [20, 30, 40, 50, 100] }
            // Text
            previousText = {'Предыдущие'}
            nextText = {'Следующие'}
            loadingText = { 'Загрузка данных...' }
            noDataText = {'Нет футбольных игр!'}
            pageText = {'Страница'}
            ofText = {'из'}
            rowsText = {'строк'}
            onResizedChange = { (newResized: Resize[]) => {
                console.log(newResized);
            } }
        />;
    }
}

