export class BaseFireService {
  public mapFromFirebase<T>(response: any, create: Function): T[] {
    if (response) {
      return Object.keys(response).map(key => {
        response[key].id = key;
        return Object.assign(create(), response[key]);
      });
    } else {
      return [];
    }
  }

  mapToFirebase2(element: any) {
    if (!element.id) element.id = new Date().getTime();
    return element;
  }
}
