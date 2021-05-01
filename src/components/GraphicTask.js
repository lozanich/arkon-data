import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryAxis,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
} from "victory";
import { Row, Col } from "react-bootstrap";
import moment from "moment"
import lodash from "lodash"

export const GraphicTask = ({ tasks }) => {
    // const actualWeek = moment().isoWeek()
  // console.log(actualWeek)
  // console.log(tasks);

    tasks = tasks
      .map((x) => {
        return { ...x, actualWeek: moment(x.createdAt).isoWeek() };
      }).filter(item => {
          return item.actualWeek === moment().isoWeek() - 1
      })
    
    tasks = lodash.orderBy(tasks, ['createdAt'])
    // console.log(tasks);

    // vars tick values
    const tickValues = []
    const tickFormat = []
    const duration1 = []
    const advance1 = [];
    // format data to graphic
    tasks.forEach((item, index) => {
        duration1.push({ quarter: index + 1, earnings: parseInt(item.duration / 60) });
        advance1.push({
          quarter: index + 1,
          earnings: parseInt(item.advance / 60)
        });
        tickValues.push(index + 1)
        tickFormat.push(`${moment(item.createdAt).format('DD-MM-YY')}`)
    })

    return (
      <>
        <Row>
          <Col className="text-center" md={12}>
            {tasks.length > 0 && (<VictoryChart domainPadding={0} theme={VictoryTheme.material}>
              {/* legends tasks */}
              <VictoryLegend
                x={100}
                y={10}
                centerTitle
                orientation="horizontal"
                gutter={20}
                style={{
                  border: { stroke: "black" },
                  title: { fontSize: 1 },
                  labels: { fontSize: 8 },
                }}
                data={[
                  { name: "Tiempo total", symbol: { fill: "red" } },
                  { name: "Tiempo usado", symbol: { fill: "green" } },
                ]}
              />

              {/* bar X */}
              <VictoryAxis
                tickValues={tickValues}
                tickFormat={tickFormat}
                height={600}
                offsetY={46}
                style={{
                  axisLabel: { fontSize: 10, padding: 10, angle: 90 },
                  ticks: {
                    stroke: "black",
                    size: 5,
                    padding: 1,
                    paddingBottom: 50,
                  },
                  tickLabels: { fontSize: 8, padding: 10, angle: 90 },
                }}
              />
              {/* bar Y */}
              <VictoryAxis
                dependentAxis
                offsetX={40}
                tickFormat={(x) => `${x}min`}
                style={{
                  axisLabel: { fontSize: 10, padding: 30, angle: 0 },
                  ticks: { stroke: "grey", size: 9, padding: 5 },
                  tickLabels: { fontSize: 8, padding: 1, angle: 0 },
                }}
              />
              <VictoryGroup offset={8} style={{ data: { width: 4 } }}>
                <VictoryStack offset={1} colorScale={"red"}>
                  {/* duaraion */}
                  <VictoryBar
                    labels={({ datum }) => `${datum.earnings}`}
                    labelComponent={
                      <VictoryLabel
                        angle={0}
                        inline
                        dy={1}
                        style={{
                          fontSize: 8,
                          fill: "red",
                          fontFamily: "Helvetica",
                        }}
                      />
                    }
                    data={duration1}
                    x="quarter"
                    y="earnings"
                  />
                </VictoryStack>
                {/* advance */}
                <VictoryStack offset={1} colorScale={"green"}>
                  <VictoryBar
                    labels={({ datum }) => `${datum.earnings}`}
                    data={advance1}
                    labelComponent={
                      <VictoryLabel
                        angle={0}
                        inline
                        dy={1}
                        style={{
                          fontSize: 8,
                          fill: "red",
                          fontFamily: "Helvetica",
                        }}
                      />
                    }
                    x="quarter"
                    y="earnings"
                  />
                </VictoryStack>
              </VictoryGroup>
            </VictoryChart>)}
          </Col>
        </Row>
      </>
    );
}
