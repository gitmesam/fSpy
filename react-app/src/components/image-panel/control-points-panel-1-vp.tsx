import * as React from 'react';
import ControlPointsPanelBase from './control-points-panel-base';
import Point2D from '../../solver/point-2d';
import HorizonControl from './horizon-control'
import VanishingPointControl from './vanishing-point-control'
import { ControlPointPairIndex } from '../../types/control-points-state';
import { HorizonMode, PrincipalPointMode1VP } from '../../types/calibration-settings';
import { Palette } from '../../style/palette';

export default class ControlPointsPanel1VP extends ControlPointsPanelBase {
  render() {
    let state = this.props.controlPointsState1VP

    return (
      <g>
        {
          this.renderPrincipalPointControl(
            state.principalPoint,
            this.props.calibrationSettings1VP.principalPointMode == PrincipalPointMode1VP.Manual
          )
        }

        { this.renderOriginControl(state.origin) }

        <VanishingPointControl
          color={Palette.colorForAxis(this.props.calibrationSettings1VP.vanishingPointAxis)}
          vanishingPointIndex={0}
          controlState={
            this.rel2AbsVanishingPointControlState(
              state.vanishingPoints[0]
            )
          }
          onControlPointDrag={(vanishingPointIndex: number, vanishingLineIndex: number, controlPointIndex: ControlPointPairIndex, position: Point2D) => {
            this.invokeVanishingLineEndpointDragCallback(
              vanishingPointIndex,
              vanishingLineIndex,
              controlPointIndex,
              position,
              this.props.onVanishingPointControlPointDrag
            )
          }}
        />

        <HorizonControl
          pointPair={
            this.rel2AbsControlPointPairState(
              this.props.controlPointsState1VP.horizon
            )
          }
          enabled={this.props.calibrationSettings1VP.horizonMode == HorizonMode.Manual}
          dragCallback={(controlPointIndex: ControlPointPairIndex, position: Point2D) => {
            this.invokeEndpointDragCallback(
              controlPointIndex,
              position,
              this.props.onHorizonDrag
            )
          }}
        />
      </g>
    )
  }
}