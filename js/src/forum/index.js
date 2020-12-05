import { extend } from 'flarum/extend';
import SignUpModal from 'flarum/components/SignUpModal';
import Stream from 'flarum/utils/Stream';
import extractText from 'flarum/utils/extractText';
import Model from 'flarum/Model';
import User from 'flarum/models/User';
import SettingsPage from 'flarum/components/SettingsPage';
import Button from 'flarum/components/Button';
import CountryModal from './components/CountryModal';

app.initializers.add('joon/country-flag', () => {
  User.prototype.country = Model.attribute('country'); 
  extend(SignUpModal.prototype, 'oninit', function() {
    this.country = Stream("");
    
  });

  extend(SignUpModal.prototype, 'fields', function(items) {
    items.add('google', 
        <div className="Form-group">
        <input
          className="FormControl"
          name="country"
          type="text"
          placeholder={extractText(app.translator.trans('joon-country-flag.forum.sign_up.country_placeholder'))}
          bidi={this.country}
          disabled={this.loading}
        />
      </div>);
  });

  extend(SignUpModal.prototype, 'submitData', function(data) {
    data.country=this.country();
  });

  extend(SettingsPage.prototype, 'accountItems', function (items) {

      items.add('changeCountry',
        <Button className="Button" onclick={() => app.modal.show(CountryModal)}>
          {app.translator.trans('joon-country-flag.forum.settings.change_country_button')}
        </Button>
      );
  });

});

