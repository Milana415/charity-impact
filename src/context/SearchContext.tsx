import { createContext, useContext, useState, type ReactNode } from 'react';
import { programs } from '../data/programs';
import type { Program } from '../types/program';

interface SearchContextType {
    searchQuery: string;
    searchResults: Program[];
    isSearching: boolean;
    handleSearch: (query: string) => void;
    clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Program[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setIsSearching(true);

        if (query.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        const results = programs.filter(program => {
            const searchLower = query.toLowerCase().trim();
            return (
                program.title.toLowerCase().includes(searchLower) ||
                program.description.toLowerCase().includes(searchLower) ||
                program.category.toLowerCase().includes(searchLower) ||
                program.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        });

        setSearchResults(results);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setIsSearching(false);
    };

    return (
        <SearchContext.Provider value={{
            searchQuery,
            searchResults,
            isSearching,
            handleSearch,
            clearSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};