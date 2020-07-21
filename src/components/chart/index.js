import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';

class Chart extends Component {
    render() {
        return (
            <VictoryChart
                theme={VictoryTheme.material}
                height={110}
                domainPadding={{ x: 40 }}
                padding={{ top: 10, bottom: 40, left: 50, right: 20 }}
            >
                <VictoryBar
                    data={this.props.data}
                    labels={({ datum }) => datum["value"]}
                    style={{ labels: { fontSize: 5 } }}
                    labelComponent={<VictoryLabel dy={-1}/>}
                    barWidth={14}
                    x="month"
                    y="value"
                />
                <VictoryAxis
                    label="Month"
                    style={{
                        axisLabel: { padding: 30, fontSize: 5 },
                        tickLabels: { fontSize: 5 }
                    }}
                />
                <VictoryAxis dependentAxis
                    label="Sales"
                    style={{
                        axisLabel: { padding: 40, fontSize: 5 },
                        tickLabels: { fontSize: 5 }
                    }}
                />
            </VictoryChart>
        );
    }
}

export default Chart;
