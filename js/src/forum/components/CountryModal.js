import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';

export default class CountryModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.country = Stream(app.session.user.country());
  }

  className() {
    return 'CountryModal Modal--small';
  }

  title() {
    return app.translator.trans('joon-country-flag.forum.change_country.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">
            <input
              type="text"
              autocomplete="off"
              name="country"
              className="FormControl"
              bidi={this.country}
              disabled={this.loading} />
          </div>
          <div className="Form-group">
            {Button.component({
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
            }, app.translator.trans('joon-country-flag.forum.change_country.submit_button'))}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    if (this.country() === app.session.user.country()) {
      this.hide();
      return;
    }

    this.loading = true;

    app.session.user.save({ country: this.country() }, {
      errorHandler: this.onerror.bind(this),
    })
      .then(this.hide.bind(this))
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}