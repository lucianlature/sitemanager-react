
import React from 'react'

export default class PanelBox extends React.Component {
  render () {
    return (
      <div className="panel-box ant-collapse">
        <div className="ant-collapse-item">
          {
              this.props.title 
                ? (<div className="ant-collapse-header"><span>{this.props.title}</span></div>)
                : null
          }
          <div className="ant-collapse-content ant-collapse-content-active">
            <div className="ant-collapse-content-box">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}