import { collections, type Collection } from '@/lib/catalog';
import { useCollection } from '@/lib/collection';
import { Button } from '@/components/ui/button';

export function CollectionToggle({ className = '' }: { className?: string }) {
  const { collection, setCollection } = useCollection();
  return <div className={`collection-toggle ${className}`} role="radiogroup" aria-label="Collection" data-active={collection}>
    {(Object.keys(collections) as Collection[]).map(key => <Button variant="navigation" key={key} type="button" role="radio" aria-checked={collection === key} className="collection-option" onClick={() => setCollection(key)}>{collections[key].label}</Button>)}
    <span className="collection-indicator" aria-hidden="true" />
  </div>;
}
