type Slot = (...args : any[]) => void;

let event_map: Map<string, Slot[]> = new Map();

export module Observer
{
    export function listen(event: string, cb: Slot) {
        if(!event_map.has(event)){
            event_map.set(event, []);
        }

        event_map.get(event).push(cb);
    }

    export function emit(event: string, ...args: any[]) {
        let cb_list = event_map.get(event);
        if(cb_list) {
            cb_list.forEach((cb) => cb(...args));
        }
    }
}
