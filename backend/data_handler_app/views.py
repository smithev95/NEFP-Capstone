from django.shortcuts import render
from .forms import ClientDataForm
# Create your views here.

def client_data_form(request):
    if request.method == 'POST':
        form = ClientDataForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success_add_client')
    else:
        form = ClientDataForm()
    return render(request, 'your_app/client_data_form.html', {'form': form})
