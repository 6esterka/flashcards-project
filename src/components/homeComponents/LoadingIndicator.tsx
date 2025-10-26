const LoadingIndicator=()=>{
    return(
        <div className="flex flex-col items-center justify-center gap-4 text-gray-600">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"/>
            <p className="text-lg font-medium">Loading flashcards...</p>
        </div>
    )
}

export default LoadingIndicator;