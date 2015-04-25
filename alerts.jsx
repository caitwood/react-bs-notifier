var React = require("react/addons");
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
require("./styles.less");

var AlertsNotifier = React.createClass({
	propTypes: {
		alerts: React.PropTypes.array.isRequired
	},
	getInitialState: function () {
		return {
			dismissedAlerts: []
		};
	},
	dismiss: function(item) {
		//TODO: remove from shown alerts here OR call onDismiss if prop set
		var newData = this.state.dismissedAlerts.slice();
		newData.push(item);
		this.setState({ dismissedAlerts: newData });
	},
	render: function () {
		var alerts = [];
		for (var i = 0; i < this.props.alerts.length; i++) {
			if (this.state.dismissedAlerts.indexOf(this.props.alerts[i]) < 0) {
				alerts.push(this.props.alerts[i]);
			}
		}

		var i = -1;

		return (
			<div className="alert-notifier-container">
				<ReactCSSTransitionGroup transitionName="alert">
					{alerts.map(function (item) {
						i++;

						if (["success", "info", "warning", "danger"].indexOf(item.type) < 0) {
							item.type = "info";
						}

						var css = "alert alert-dismissible alert-" + item.type;
						var headline = item.headline ? <strong>{item.headline}&nbsp;</strong> : null;

						return (
							<div className={css} key={i}>
								<button type="button" className="close" title="Dismiss" onClick={this.dismiss.bind(this, item)}>&times;</button>
								{headline}{item.message}
							</div>
						);
					}.bind(this))}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

module.exports = AlertsNotifier;
