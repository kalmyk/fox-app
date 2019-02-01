import Reflux from 'reflux';
import * as Actions from './TicketActions';

export default class TicketStore extends Reflux.Store
{
  constructor()
	{
		super();

		this.state.isAddOpen = false;
    this.listenToMany(Actions);
	}

}
